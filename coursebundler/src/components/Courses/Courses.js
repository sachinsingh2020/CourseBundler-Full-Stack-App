import { Button, Container, Heading, HStack, Input, Stack, Text, VStack, Image } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { getAllCourses } from '../../redux/actions/course';
import { addToPlaylist } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';



const Course = ({ views, title, imageSrc, id, addToPlaylistHandler, creator, description, lectureCount, loading }) => {
    return (
        <VStack className='course' alignItems={['center', 'flex-start']}>
            <Image src={imageSrc} boxSize="60" objectFit={'contain'} />
            <Heading textAlign={['center', 'left']} maxW="200px" fontFamily={'sans-serif'} noOfLines={3} children={title} size={'sm'} />
            <Text noOfLines={2} children={description} />
            <HStack>
                <Text fontWeight={'bold'} textTransform="uppercase" children={'Creator'} />
                <Text fontFamily={'body'} textTransform="uppercase" children={creator} />
            </HStack>
            <Heading textAlign={'center'} size={'xs'} children={`Lectures - ${lectureCount}`} textTransform={'uppercase'} />
            <Heading size={'xs'} children={`Views - ${views}`} textTransform={'uppercase'} />
            <Stack direction={['column', 'row']} alignItems="center"  >
                <Link to={`/course/${id}`}>
                    <Button colorScheme={'yellow'} >Watch Now</Button>
                </Link>
                <Button isLoading={loading} variant={'ghost'} colorScheme={'yellow'} onClick={() => addToPlaylistHandler(id)} >Add to Playlist</Button>
            </Stack>
        </VStack>
    )
}

const Courses = () => {
    const [keyword, setKeyword] = useState('');
    // eslint-disable-next-line 
    const [category, setCategory] = useState('');
    const dispatch = useDispatch();

    const categories = [
        'Web Development',
        'Artificial Intelligence',
        'Data Structure & Algorithms',
        'App Development',
        'Data Science',
        'Game Development',
    ]

    const addToPlaylistHandler = async (courseId) => {
        await dispatch(addToPlaylist(courseId));
        dispatch(loadUser())
    }

    const { loading, courses, error, message } = useSelector(state => state.courses);
    console.log(courses);

    useEffect(() => {
        dispatch(getAllCourses(category, keyword));
        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' });
        }
        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' });
        }
    }, [dispatch, category, keyword, error, message]);

    return (
        <Container minH={'95vh'} maxW='container.lg' paddingY={'8'}>
            <Heading children="All Courses" m={'8'} />
            <Input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="Search a course" type={'text'} focusBorderColor="yellow.500" />
            <HStack overflowX={'auto'} padding={'8'}>
                {
                    categories.map((item, index) => (
                        <Button isLoading={loading} key={index} onClick={() => setCategory(item)} minW={'60'} >
                            <Text children={item} />
                        </Button>
                    ))
                }
            </HStack>
            <Stack direction={['column', 'row']} flexWrap={'wrap'} justifyContent={['flex-end', 'space-evenly']} alignItems={['center', 'flex-start']}>
                {courses.length > 0 ? (
                    courses.map(item => (
                        <Course
                            key={item._id}
                            title={item.title}
                            description={item.description}
                            views={item.views}
                            imageSrc={item.poster.url}
                            id={item._id}
                            creator={item.createdBy}
                            lectureCount={item.numOfVideos}
                            addToPlaylistHandler={addToPlaylistHandler}
                            loading={loading}
                        />
                    ))
                ) : (
                    <Heading mt="4" children="Courses Not Found" />
                )}
            </Stack>
        </Container>
    )
}

export default Courses
