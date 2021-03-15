import { register, login } from '../controllers/userController'

const authenticationRoutes = (app) => {
    app.route('/user/register')
        .post(register);

    app.route('/user/login')
        .post(login);

}

export default authenticationRoutes;