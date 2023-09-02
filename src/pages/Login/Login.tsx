import { Link, useNavigate } from 'react-router-dom';
import { isEmailValid, isPasswordValid } from '../../utils/utils';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { FieldType, ILoginValues } from './Login.interface';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginUserAsync, selectLoginUSerState, setState } from './Login.slice';
import _ from 'lodash';
import { useEffect } from 'react';

export default function Login() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { loader, message: messageState } = useAppSelector(selectLoginUSerState)

    useEffect(() => {
        if (!_.isEmpty(messageState.message)) {
            if (messageState.type === "success") {
                message.success(messageState.message);
                dispatch(setState({ key: "message", value: { type: "", message: "" } }))
                navigate("/home")
            }
            if (messageState.type === "error") {
                message.error(messageState.message);
                dispatch(setState({ key: "message", value: { type: "", message: "" } }))
            }
        }
    }, [messageState])


    const onFinish = (values: ILoginValues) => {
        const { email, password } = values
        const isValidEmail = isEmailValid(email)
        const isValidPassword = isPasswordValid(password)

        if (!isValidEmail) {
            dispatch(setState({ key: "message", value: { type: "error", message: "Please enter a valid email id" } }))
        }
        else if (!isValidPassword) {
            dispatch(setState({ key: "message", value: { type: "error", message: "Please enter a valid password" } }))
        } else {
            dispatch(loginUserAsync(values))
        }

    };

    const onFinishFailed = (errorInfo: any) => {
        dispatch(setState({ key: "message", value: { type: "error", message: _.get(errorInfo, 'errorFields[0].errors[0]', "") } }))
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

                <Form.Item<FieldType>
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <p>New user? Click <Link to='/register'> here </Link> to register</p>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={_.isEqual(loader, "loading")}
                    >
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
