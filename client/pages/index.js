import buildClient from "../api/build-client";

const LandingPage = (data) => {
    return <div>
        <h1>Landing Page</h1>
        <pre>
            {JSON.stringify(data)}
        </pre>
    </div>;
};

LandingPage.getInitialProps = async (context) => {
        const { data } = await buildClient(context).get('/api/users/currentuser');

        return data;
}

export default LandingPage;