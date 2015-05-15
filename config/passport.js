/**
 * Created by acer on 24.04.2015.
 */
var LocalStrategy     = require('passport-local').Strategy;
var Firm              = require('../models/firm');
module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(firm, done) {
        done(null, firm.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        Firm.findById(id, function(err, firm) {
            done(err, firm);
        });
    });


    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {

            process.nextTick(function() {
                req.assert('title', 'Не заполнено поле "Название фирмы"').notEmpty();
                req.assert('email', 'Поле Email заполнено некорректно').isEmail();
                req.assert('password', 'Пароль должен содержать от 6 до 20 символов').len(6, 20);
                req.assert('proxy', 'Не заполнено поле "Доверенное лицо"').notEmpty();
                req.assert('line', 'Не заполнено поле "Род деятельности фирмы"').notEmpty();
                req.assert('registration_number', 'Не заполнено поле "Регистрационный номер"').notEmpty();
                req.assert('headquarters', 'Не заполнено поле "Адрес офиса"').notEmpty();
                req.assert('phone', 'Не заполнено поле "Контактный телефон"').notEmpty();
                if(req.validationErrors()){
                    return done(null, false, req.flash('validMessage', req.validationErrors()));
                }
                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                Firm.findOne({ 'local.email' :  email }, function(err, firm) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that email
                    if (firm) {
                        return done(null, false, req.flash('signupMessage', 'Этот Email уже занят.'));
                    } else {

                        // if there is no user with that email
                        // create the user
                        var newFirm            = new Firm();

                        // set the user's local credentials
                        newFirm.local.email    = email;
                        newFirm.local.password = newFirm.generateHash(password);
                        newFirm.local.title = req.body.title;
                        newFirm.local.line = req.body.line;
                        newFirm.local.registration_number = req.body.registration_number;
                        newFirm.local.proxy = req.body.proxy;
                        newFirm.local.headquarters = req.body.headquarters;
                        newFirm.local.phone = req.body.phone;
                        newFirm.local.fax = req.body.fax;
                        newFirm.local.description = req.body.description;

                        // save the user
                        newFirm.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newFirm);
                        });
                    }

                });

            });

        }));

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) { // callback with email and password from our form

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            Firm.findOne({ 'local.email' :  email }, function(err, firm) {
                // if there are any errors, return the error before anything else
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!firm)
                    return done(null, false, req.flash('loginMessage', 'Нет аккаунта с таким Email.')); // req.flash is the way to set flashdata using connect-flash

                // if the user is found but the password is wrong
                if (!firm.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Неверный пароль.')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, firm);
            });

        }));
};