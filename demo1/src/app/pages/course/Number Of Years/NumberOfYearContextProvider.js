import {createContext, useContext} from 'react'
import {useQuery, useQueryClient} from 'react-query'
import {useAuth} from '../../../modules/auth'
import axios from 'axios'

const NumberOfYearContext = createContext()

export const NumberOfYearContextProvider = ({children}) => {
  const queryClient = useQueryClient()
  const {auth} = useAuth()
  let config = {
    headers: {
      Authorization: `Bearer ${auth?.api_token}`,
    },
  }

  const courseNumberOfYearTypesLists = useQuery({
    queryKey: ['getCourseNumberOfYearsTypes'],
    queryFn: async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/courses/numberOfYears', config)
        return response.data
      } catch (error) {
        throw new Error('Error fetching student data: ' + error.message)
      }
    },
  })

  const addNumberOfYearsCourseTypes = useQuery({
    mutationFn: async (data) => {
      console.log(data)
      return axios
        .post('http://localhost:8080/api/courses/numberOfYears', data, config)
        .then((res) => res.data)
    },
    onMutate: () => {
      console.log('mutate')
    },

    onError: () => {
      console.log('error')
    },

    onSuccess: () => {
      alert('Add Number Of Years Course Type Successfully!')
      console.log('success')
    },

    onSettled: async (_, error) => {
      console.log('settled')
      if (error) {
        //console.log(error)
        alert('There is Course Type Error You have existed course type !')
      } else {
        await queryClient.invalidateQueries({queryKey: ['getCourseNumberOfYearsTypes']})
      }
    },
  })

  // console.log(courseNumberOfYearTypesLists)

  return (
    <NumberOfYearContext.Provider
      value={{courseNumberOfYearTypesLists, addNumberOfYearsCourseTypes}}
    >
      {children}
    </NumberOfYearContext.Provider>
  )
}

export const uesNumberOfYearCourseTypes = () => useContext(NumberOfYearContext)
