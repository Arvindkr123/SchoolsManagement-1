import {createContext} from 'react'
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

  console.log(courseNumberOfYearTypesLists)

  return (
    <NumberOfYearContext.Provider value={{courseNumberOfYearTypesLists}}>
      {children}
    </NumberOfYearContext.Provider>
  )
}
