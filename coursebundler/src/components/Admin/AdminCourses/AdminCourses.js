import React, { useEffect, useState } from 'react'
import { Grid, Box, Heading, Image } from '@chakra-ui/react'
import { Table, TableCaption, Tbody, Td, Th, Thead, Tr, TableContainer } from '@chakra-ui/table'
import { HStack, Button } from '@chakra-ui/react'
import Sidebar from '../Sidebar'
import cursor from '../../../assets/images/cursor.png'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import CourseModel from './CourseModel'
import { useDisclosure } from '@chakra-ui/hooks'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCourses, getCourseLectures } from '../../../redux/actions/course'
import { addLecture, deleteCourse, deleteLecture } from '../../../redux/actions/admin'
import { toast } from 'react-hot-toast'

const AdminCourses = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [courseId, setCourseId] = useState('');
    const [courseTitle, setCourseTitle] = useState('');

    const dispatch = useDispatch();
    const { courses, lectures } = useSelector(state => state.courses);
    const { loading, error, message } = useSelector(state => state.admin);

    const courseDetailHandler = (courseId, title) => {
        dispatch(getCourseLectures(courseId));
        onOpen();
        setCourseId(courseId);
        setCourseTitle(title);
    }

    const deleteButtonHandler = (courseId) => {
        dispatch(deleteCourse(courseId));
    }

    const deleteLectureButtonHandler = async (courseId, lectureId) => {
        await dispatch(deleteLecture(courseId, lectureId));
        dispatch(getCourseLectures(courseId));
    }

    const addLectureHandler = async (e, courseId, title, description, video) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.append('title', title);
        myForm.append('description', description);
        myForm.append('file', video);

        await dispatch(addLecture(courseId, myForm));
        dispatch(getCourseLectures(courseId));
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' });
        }
        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' });
        }
        dispatch(getAllCourses());
    }, [dispatch, error, message]);



    return (
        <Grid css={{
            cursor: `url(${cursor}), default`
        }}
            minH={'100vh'} templateColumns={['1fr', '5fr 1fr']} >
            <Box p={['0', '8']} overflowX="auto">
                <Heading
                    textTransform={'uppercase'}
                    children="All Users"
                    my="16"
                    textAlign={['center', 'left']}
                />
                <TableContainer w={['100vw', 'full']}>
                    <Table variant={'simple'} size="lg">
                        <TableCaption>All available courses in the database</TableCaption>

                        <Thead>
                            <Tr>
                                <Th>Id</Th>
                                <Th>Poster</Th>
                                <Th>Title</Th>
                                <Th>Category</Th>
                                <Th>Creator</Th>
                                <Th isNumeric>Views</Th>
                                <Th isNumeric>Lectures</Th>
                                <Th isNumeric>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                courses.map((item) => (
                                    <Row key={item._id} item={item} courseDetailHandler={courseDetailHandler} deleteButtonHandler={deleteButtonHandler} loading={loading} />
                                ))
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
                <CourseModel isOpen={isOpen} onClose={onClose} deleteButtonHandler={deleteLectureButtonHandler} addLectureHandler={addLectureHandler} id={courseId} courseTitle={courseTitle} lectures={lectures} />
            </Box>
            <Sidebar />

        </Grid>
    )
}

export default AdminCourses

function Row({ item, courseDetailHandler, deleteButtonHandler, loading }) {
    return (
        <Tr>
            <Td>#{item._id}</Td>
            <Td>
                <Image src={item.poster.url} />
            </Td>
            <Td>{item.title}</Td>
            <Td textTransform={'uppercase'} >{item.category}</Td>
            <Td>{item.createdBy}</Td>
            <Td isNumeric >{item.views}</Td>
            <Td isNumeric >{item.numOfVideos}</Td>
            <Td isNumeric>
                <HStack justifyContent={'flex-end'}>
                    <Button isLoading={loading} variant={"outline"} color={'purple.500'} onClick={(e) => courseDetailHandler(item._id, item.title)} >View Lectures</Button>

                    <Button isLoading={loading} onClick={(e) => deleteButtonHandler(item._id)} color={'purple.600'} ><RiDeleteBin7Fill /></Button>
                </HStack>
            </Td>
        </Tr>
    )
}
