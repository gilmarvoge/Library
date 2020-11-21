import React, { useEffect, useState } from 'react';

//import { connect } from 'react-redux';
//import { useForm } from 'react-hook-form';
//import { Link } from 'react-router-dom';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// custom components
import TextField from 'components/Textfield'; 
//import Button from "components/CustomButton/Button";//foi
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from "components/Card/CardHeader";
import CardFooter from "components/Card/CardFooter";
import {GridContainer,GridItem} from 'components/Grid';

//import Snackbar from "components/Snackbar/Snackbar";
//import { LinearProgress } from "components/Loadings";

//redux
//import { login } from 'redux/auth/actions';
//import * as constants from 'redux/auth/constants';
//import { checkIfLoading } from 'redux/ui/selectors';
//styles
import loginPageStyle from './styles';
//translates

//import {getPath} from "routes/utils";

function LoginPage(props) {
    
    const { classes, dispatch, isLoading } = props;
    const [cardAnimaton, setCardAnimaton] = useState("cardHidden"); //Por default o display é none style pra não mostrar a barra
    const { register, handleSubmit, errors } = useForm(); // initialise the hook
    

    useEffect(() => {
        // we add a hidden class to the card and after 700 ms we delete it and the transition appears
        let timeOutFunction = setTimeout(
            function () {
                setCardAnimaton("");
            },
            700
        )

        return () => {
            clearTimeout(timeOutFunction);
            timeOutFunction = null;
        }
    }, []);

    const onSubmit = async (data, e) => {
        console.log("e ", e)
        e.preventDefault();
        const { email, password } = data;
        // setLoading(true);

       // await dispatch(login(email, password));

        //setLoading(false);
    }

    return (
        <div className={classes.container}>
            <GridContainer justify="center">
                <GridItem xs={12} sm={6} md={4}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        < Card login className={classes[cardAnimaton]}>
                            <CardHeader
                                className={`${classes.cardHeader} ${classes.textCenter}`}
                                color="warning"
                            >
                                {console.log("loain   ", isLoading)}
                                {/* {isLoading && <LinearProgress />} */}
                               
                                <h3 className={classes.cardTitle}>LOGIN</h3>
                            </CardHeader>
                            <CardBody>
                                <TextField margin="normal" fullWidth={true}
                                    label={t('email')}
                                    id="email"
                                    name="email"
                                    autoComplete="email"
                                    inputRef={register({ required: 'Digite um nome de usuário' , pattern: { value: emailRegex, message: t('invalidEmail') } })}
                                />
                                <TextField margin="normal" fullWidth={true}
                                    label="Senha"
                                    id="password"
                                    name="password"
                                    autoComplete="password"
                                    type="password"
                                    inputRef={register({ required: 'Digite uma senha' })}
                                />
                               
                                {/* {errors.email && <Snackbar icon severity="error" message={errors.email?.message} />}
                                {errors.password && <Snackbar icon severity="error" message={errors.password?.message} />} */}
                            </CardBody>
                            {/* <CardFooter className={classes.justifyContentCenter} >
                                <Button type="submit" >
                                  Enviar
                                </Button>
                            </CardFooter> */}
                        </Card>
                    </form >
                </GridItem>
            </GridContainer>
        </div>
    )
}

LoginPage.propTypes = {
    classes: PropTypes.object.isRequired,
    dispatch: PropTypes.func,
    isLoading: PropTypes.bool,

}

// const mapStateToProps = (state) => ({
//     isLoading: checkIfLoading(state, constants.LOGIN_REQUEST),
// });

export default withStyles(loginPageStyle)(LoginPage)
//export default connect(mapStateToProps)(withStyles(loginPageStyle)(LoginPage))






