import { Box, Grid, Heading, Tag, TagCloseButton, TagLabel } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useMemo } from 'react'
import { MeQuery, useCvsQuery, useDeleteCvMutation, useEducationItemsQuery, useExperiencesQuery, useQualificationsQuery, UserQuery } from 'src/generated/graphql'
import { CreateEducationItemButton } from './CreateEducationItemButton'
import { CreateExperienceButton } from './CreateExperienceButton'
import { CreateQualificationButton } from './CreateQualificationButton'
import { EditAboutButton } from './EditAboutButton'
import { EducationItem } from './EducationItem'
import { Experience } from './Experience'
import { Qualification } from './Qualification'
import { SetSkillsButton } from './SetSkillsButton'
import { UploadCVButton } from './UploadCVButton'
const QuillDisplay = dynamic(() => import('src/components/QuillDisplay.client'), { ssr: false })

interface UserMainProps {
  data: UserQuery
  me: MeQuery['me']
}

export const UserMain = (props: UserMainProps): JSX.Element => {
  const { data, me } = props
  const userId = useMemo(() => data?.user?.id, [data])
  const [{ data: educationItemsData }] = useEducationItemsQuery({
    pause: !userId,
    variables: {
      userId
    }
  })
  const [{ data: experiencesData }] = useExperiencesQuery({
    pause: !userId,
    variables: {
      userId
    }
  })
  const [{ data: qualificationsData }] = useQualificationsQuery({
    pause: !userId,
    variables: {
      userId
    }
  })
  const [{ data: cvsData }] = useCvsQuery({
    pause: !userId,
    variables: {
      userId
    }
  })
  const [, deleteCV] = useDeleteCvMutation()

  return (
    <>
      <Box w='full' position='relative' bgColor='white' shadow='lg' mb='4' mt={10} p='10'>
        <Heading size='lg' mb={4}>About</Heading>
        {
          data?.user?.id == me?.id &&
          <EditAboutButton data={data} />
        }
        <QuillDisplay value={data?.user?.about} />
      </Box>
      <Box w='full' position='relative' bgColor='white' shadow='lg' mb='4' mt={10} p='10'>
        <Heading size='lg' mb={4}>Education</Heading>
        {
          data?.user?.id == me?.id &&
          <CreateEducationItemButton />
        }
        {
          educationItemsData?.educationItems?.length > 0 &&
          <Grid templateRows={`repeat(${educationItemsData.educationItems.length}, 1fr)`} rowGap={3}>
            {
              educationItemsData.educationItems.map(item => (
                <EducationItem key={item.id} data={data} me={me} item={item} />
              ))
            }
          </Grid>
        }
      </Box>
      <Box w='full' position='relative' bgColor='white' shadow='lg' mb='4' mt={10} p='10'>
        <Heading size='lg' mb={4}>Experience</Heading>
        {
          data?.user?.id == me?.id &&
          <CreateExperienceButton />
        }
        {
          experiencesData?.experiences?.length > 0 &&
          <Grid templateRows={`repeat(${experiencesData.experiences.length}, 1fr)`} rowGap={3}>
            {
              experiencesData.experiences.map(item => (
                <Experience key={item.id} data={data} me={me} item={item} />
              ))
            }
          </Grid>
        }
      </Box>
      <Box w='full' position='relative' bgColor='white' shadow='lg' mb='4' mt={10} p='10'>
        <Heading size='lg' mb={4}>{'Licenses & Certifications'}</Heading>
        {
          data?.user?.id == me?.id &&
          <CreateQualificationButton />
        }
        {
          qualificationsData?.qualifications?.length > 0 &&
          <Grid templateRows={`repeat(${qualificationsData.qualifications.length}, 1fr)`} rowGap={3}>
            {
              qualificationsData.qualifications.map(item => (
                <Qualification key={item.id} data={data} me={me} item={item} />
              ))
            }
          </Grid>
        }
      </Box>
      <Box w='full' position='relative' bgColor='white' shadow='lg' mb='4' mt={10} p='10'>
        <Heading size='lg' mb={4}>Skills</Heading>
        {
          data?.user?.id == me?.id &&
          <SetSkillsButton data={data} />
        }
        {
          data?.user?.skills?.length > 0 &&
          data.user.skills.map((skill, index) => (
            <Tag key={index} mr={3} mb={2} colorScheme='green'>{skill}</Tag>
          ))
        }
      </Box>
      <Box w='full' position='relative' bgColor='white' shadow='lg' mb='4' mt={10} p='10'>
        <Heading size='lg' mb={4}>CVs</Heading>
        {
          cvsData?.cvs?.length > 0 &&
          cvsData.cvs.map(cv => (
            <Tag
              key={cv.id}
              borderRadius='full'
              variant='subtle'
              colorScheme='green'
            >
              <TagLabel>
                <Link href={cv.url} download>
                  {cv.filename}
                </Link>
              </TagLabel>
              {
                data?.user?.id == me?.id &&
                <TagCloseButton onClick={() => { deleteCV({ id: cv.id }) }} />
              }
            </Tag>
          ))
        }
        {
          data?.user?.id == me?.id &&
          <UploadCVButton />
        }
      </Box>
    </>
  )
}