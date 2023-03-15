"use client";

const Login = () => {
  const signInWithGoogle = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };
  const signInWithGithub = async () => {
    try {
      await githubSignIn();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center gap-y-8">
      <GoogleButton onClick={signInWithGoogle}>
        Sign In With Google
      </GoogleButton>
      <GithubButton onClick={signInWithGithub}>
        Sign In With Github
      </GithubButton>
    </div>
  );
};

export default Login;
