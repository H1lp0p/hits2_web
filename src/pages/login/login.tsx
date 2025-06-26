import { ChangeEvent, useState } from 'react'
import img from '../../assets/img/login_page_img.png'
import css from './login.module.css'
import { Input, InputStates } from '../../common/components/input-floating-label/input-floating-label'
import Switch from '../../common/components/switch/switch'
import { Button } from '../../common/components/button/button'
import { loginUser } from '../../features/domain/redux/slices/user-sessions-slice'
import { useMyDispatch } from '../../hooks/my-dispatch'

const strings = {
    card_label: "Вход в аккаунт",
    email_input: {
        label: "Электронная почта"
    },
    password_input: {
        label: "Пароль"
    },
    remeber_switch: {
        label: "Запомнить меня"
    },
    submit_btn: {
        label: "войти"
    }
}

type inputState = {
    value?: string,
    stat: InputStates,
    supporting?: string;
}   

const Login: React.FC = () => {

    const [email, setEmail] = useState<inputState>({stat: "default"});
    const [password, setPassword] = useState<inputState>({stat: "default"});
    const [rememberMe, setRememberMe] = useState(false);

    const dispatch = useMyDispatch();

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.checkValidity()){
            console.log("valid");
            
            setEmail({value: e.target.value, stat: 'default', supporting: undefined})
        }
        else{
            setEmail({value: e.target.value, stat: "error", supporting: "Неверный email"})
        }
        console.log(email.stat != "error" && password.stat != "error");
    }

    const handlePassChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.checkValidity()){
            setPassword({value: e.target.value, stat: 'default', supporting: undefined})
        }
        else{
            setPassword({value: e.target.value, stat: "error", supporting: "Что то не так с паролем?"})
        }
        console.log(email.stat != "error" && password.stat != "error");
    }

    const handleSubmit = () => {
        console.log(email, password, rememberMe);
        dispatch(loginUser({email: email.value!, password: password.value!, rememberMe: rememberMe}))
        alert("нужен popup")
    }

    return (
        <div className={css.mainContainer}>
            <img src={img} className={css.image}/>
            <div className={css.card}>
                <span className='h1' style={{marginBottom: "48px", textAlign: "center"}}>{strings.card_label}</span>
                <div className={css.inputGroup}>
                    <Input
                    id="login_email"
                    type='email'
                    label={strings.email_input.label} 
                    value={email.value}
                    onChange={handleEmailChange}
                    state={email.stat}
                    supportingText={email.supporting}
                    style={{width: '100%'}}
                    />
                    <Input
                        id="login_email"
                        type='password'
                        label={strings.password_input.label} 
                        value={password.value}
                        onChange={handlePassChange}
                        state={password.stat}
                        supportingText={password.supporting}
                        style={{width: '100%'}}
                    />
                </div>
                <div style={{display: "inline", marginBottom: "20px"}}>
                    <Switch
                        defaultChecked={rememberMe}
                        onChange={(checked: boolean) => setRememberMe(checked)}
                        style={{marginRight: "16px"}}
                    />
                    <span className='p2' style={{color: "#949494"}}>{strings.remeber_switch.label}</span>
                </div>
                <Button variant='filled' onClick={handleSubmit} style={{width: "100%"}} disabled={email.stat == "error" || password.stat == "error"}>{strings.submit_btn.label}</Button>
            </div>
        </div>
    );
}

export default Login;