import { Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'

const TableContainer = ({item}) => {
  
  // console.log(item)
    return (
            <tr className='detailTr'>
            <td><img src={item.picture.thumbnail} alt="thumb"></img></td>
            <td>{item.name.first}{"  "}{item.name.last}</td>
                <td>{item.dob.age}</td>
                <td>{item.gender}</td>
                <td>{item.email}</td>
                <td>{item.location.city}</td>
                <td>{item.phone}</td>
            </tr>
  )
}

export default TableContainer