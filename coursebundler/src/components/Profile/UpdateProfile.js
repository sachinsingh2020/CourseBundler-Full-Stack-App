import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
// import { updateProfile } from '../../redux/actions/profile';
// import { loadUser } from '../../redux/actions/user';

const UpdateProfile = ({ user }) => {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const submitHandler = async e => {
        e.preventDefault();
        await dispatch(updateProfile(name, email));
        dispatch(loadUser());
        navigate('/profile');
    };
    const { loading,error,message } = useSelector(state => state.profile);


    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' });
        }
        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' });
        }
    }, [dispatch, error, message]);

    return (
        <Container py="16" minH={'90vh'}>
            <form onSubmit={submitHandler}>
                <Heading
                    textTransform={'uppercase'}
                    children="Update Profile"
                    my="16"
                    textAlign={['center', 'left']}
                />

                <VStack spacing={'8'}>
                    <Input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Name"
                        type={'text'}
                        focusBorderColor="yellow.500"
                    />{' '}
                    <Input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email"
                        type={'email'}
                        focusBorderColor="yellow.500"
                    />
                    <Button
                        isLoading={loading}
                        w="full"
                        colorScheme={'yellow'}
                        type="submit"
                    >
                        Update
                    </Button>
                </VStack>
            </form>
        </Container>
    );
};

export default UpdateProfile;
