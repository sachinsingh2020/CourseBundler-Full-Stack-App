import { Box, Heading, HStack, Stack, VStack } from '@chakra-ui/react'
import React from 'react'
import { DiGithub } from 'react-icons/di'
import { TiSocialInstagramCircular } from 'react-icons/ti'
import { TiSocialLinkedinCircular } from 'react-icons/ti'

const Footer = () => {
    return (
        <Box padding={'4'} bg="blackAlpha.900" minH={'10vh'} >
            <Stack direction={['column', 'row']} >
                <VStack alignItems={['center', 'flex-start']} width={'full'} >
                    <Heading children={'All Right Reserved'} color="white" />
                    <Heading children={'@SacWac'} fontFamily={'body'} size={'sm'} color={'yellow.400'} />
                </VStack>
                <HStack spacing={['2','8']} justifyContent={'center'} color={'white'} fontSize='50' >
                    <a href="https://www.linkedin.com/in/sachin-singh-040290218/" rel="noreferrer" target={'_blank'}>
                        <TiSocialLinkedinCircular size={'3rem'} color={'white'} />
                    </a>
                    <a href="https://www.instagram.com/__sachin__singh_1/" rel="noreferrer" target={'_blank'}>
                        <TiSocialInstagramCircular size={'3rem'} color={'white'} />
                    </a>
                    <a href="https://github.com/sachinsingh2020" rel="noreferrer" target={'_blank'}>
                        <DiGithub size={'3rem'} color={'white'} />
                    </a>
                </HStack>
            </Stack>
        </Box>
    )
}

export default Footer
