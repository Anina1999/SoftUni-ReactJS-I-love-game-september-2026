import { useNavigate } from "react-router";

export default function Register({
    onRegister,
}) {
    
    const navigate = useNavigate();

    const registerAction = (formData) => {

        const email = formData.get("email");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirm-password");

        //basic validation
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        if (!email || !password || !confirmPassword) {
            alert('All fields are required!');
            return;
        }

        onRegister({ email }); 

        //redirect to home page
        navigate("/");
    };

    return (
        <>
        <section id="register-page" className="content auth">
            <form id="register" action={registerAction}>
                <div className="container">
                    <div className="brand-logo" />
                    <h1>Register</h1>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Your Email" />
                    <label htmlFor="pass">Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="register-password"
                        placeholder="Password"
                    />
                    <label htmlFor="con-pass">Confirm Password:</label>
                    <input
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        placeholder="Repeat Password"
                    />
                    <input className="btn submit" type="submit" defaultValue="Register" />
                </div>
            </form>
        </section>
        </>
    );
}