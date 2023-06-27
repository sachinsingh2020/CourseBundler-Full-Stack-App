import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { resetpassword } from '../../redux/actions/profile';

const ResetPassword = () => {
    const [password, setPassword] = useState('');

    const params = useParams();
    const navigate = useNavigate();

    const { loading, message, error } = useSelector(state => state.profile);

    const dispatch = useDispatch();
    const submitHandler = e => {
        e.preventDefault();
        dispatch(resetpassword(params.token, password));
        navigate('/login');
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' });
        }
        console.log(error);
        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' });
        }
    }, [dispatch, error, message]);

    return (
        <Container py={'16'} h="90vh">
            <form onSubmit={submitHandler}>
                <Heading
                    children="Reset Password"
                    my="16"
                    textTransform={'uppercase'}
                    textAlign={['center', 'left']}
                />

                <VStack spacing={'8'}>
                    <Input
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="New Password"
                        type={'password'}
                        focusBorderColor="yellow.500"
                    />

                    <Button
                        isLoading={loading}
                        type="submit"
                        w={'full'}
                        colorScheme="yellow"
                    >
                        Reset Password
                    </Button>
                </VStack>
            </form>
        </Container>
    );
};

export default ResetPassword;
