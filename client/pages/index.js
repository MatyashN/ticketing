import buildClient from "../api/build-client";

const LandingPage = ({currentUser}) => {
    return currentUser ? <h1>You are signed in {currentUser.email}</h1> : <h1>You are NOT signed in</h1>;
};

LandingPage.getInitialProps = async (context) => {
    const {data} = await buildClient(context).get('/api/users/currentuser');
    console.log(3333333);
    return data;
}

export default LandingPage;
