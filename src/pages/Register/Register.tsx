import styles from "./Register.module.css"
import "./override.css"
import { Button, Form, Input, message } from 'antd';
import { isEmailValid, isPasswordValid } from '../../utils/utils';
import { Link, useNavigate } from 'react-router-dom';
import { FieldType, IRegisterValues } from './Register.interface';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { registerUserAsync, selectRegisterUSer, setState } from './Register.slice';
import _ from 'lodash';
import { useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { CaretLeftFilled } from '@ant-design/icons';


export default function Register() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { errorMessage, loader, successMessage } = useAppSelector(selectRegisterUSer)

    useEffect(() => {
        if (!_.isEmpty(errorMessage)) {
            message.error(errorMessage)
            dispatch(setState({ key: "errorMessage", value: "" }))
        }
        if (!_.isEmpty(successMessage)) {
            message.success(successMessage)
            dispatch(setState({ key: "successMessage", value: "" }))
            navigate('/login')
        }
    }, [errorMessage, successMessage])

    const onFinish = (values: IRegisterValues) => {
        const { email, password } = values
        const isValidEmail = isEmailValid(email)
        const isValidPassword = isPasswordValid(password)
        if (!isValidEmail) {
            dispatch(setState({ key: "errorMessage", value: "Please enter a valid email id" }))
        }
        else if (!isValidPassword) {
            dispatch(setState({ key: "errorMessage", value: "Please enter a strong password" }))
        } else {
            dispatch(registerUserAsync(values))
        }

    };

    const onFinishFailed = (errorInfo: any) => {
        dispatch(setState({ key: "errorMessage", value: _.get(errorInfo, 'errorFields[0].errors[0]', "") }))
    };

    return (
        <div className="user-register">
            <Navbar />
            <div className={styles.Header}>
                <div className={styles.BackIconContainer} onClick={() => navigate(-1)}>
                    <CaretLeftFilled className={styles.BackIcon} />
                </div>
                <div>
                    Register
                </div>
            </div>
            <div className={styles.RegisterContainer}>
                <Form
                    className={styles.RegisterForm}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <p>Already registered? Click <Link to='/login'> here </Link> to login</p> <br />
                    <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={_.isEqual(loader, "loading")}
                        >
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
