import withAuth from "@/services/withAuth";

const WelcomePage = () => {


    return (
        <div>
            <h1>Bem-vindo à página de boas-vindas!</h1>
        </div>
    );
};

export default withAuth(WelcomePage);

