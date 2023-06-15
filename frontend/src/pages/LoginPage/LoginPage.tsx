import Form from './Form/Form';
import styles from './LoginPage.module.scss';

const LoginPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.formbox}>
        <Form />
      </div>
      <div className={styles.boardbox}></div>
    </div>
  );
};

export default LoginPage;
