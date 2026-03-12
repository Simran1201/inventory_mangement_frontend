import { Button, Result } from "antd";

const ErrorPage = () => {
  return (
    <Result
      status="500"
      title="500"
      subTitle="Something went wrong."
      extra={
        <Button type="primary" href="/">
          Go Home
        </Button>
      }
    />
  );
};

export default ErrorPage;
