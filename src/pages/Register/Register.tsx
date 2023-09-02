import { Button, Form, Input, message } from 'antd';
import { isEmailValid, isPasswordValid } from '../../utils/utils';
import { Link, useNavigate } from 'react-router-dom';
import { FieldType, IRegisterValues } from './Register.interface';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { registerUserAsync, selectRegisterUSer, setState } from './Register.slice';
import _ from 'lodash';
import { useEffect } from 'react';


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
            dispatch(setState({ key: "errorMessage", value: "Please enter a valid password" }))
        } else {
            dispatch(registerUserAsync(values))
        }

    };

    const onFinishFailed = (errorInfo: any) => {
        dispatch(setState({ key: "errorMessage", value: _.get(errorInfo, 'errorFields[0].errors[0]', "") }))
    };

    return (
        <div>
            <Form
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
                <p>Already registered? Click <Link to='/login'> here </Link> to login</p>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
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
    )
}
