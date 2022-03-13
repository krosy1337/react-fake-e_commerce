import React, {FC} from 'react'
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material"
import {ISortItem} from './pages/Products'

interface SortProductsProps {
    sortItems: ISortItem[]
    sortType: string
    setSortType: (sort: string) => void
}

const SortProducts: FC<SortProductsProps> = ({sortItems, setSortType, sortType}) => {
    const handleChange = (e: SelectChangeEvent) => {
        setSortType(e.target.value as string)
    }
    return (
        <Box sx={{marginBottom: 3,}}>
            <FormControl variant="standard" sx={{width: 200}}>
                <InputLabel>Sort by</InputLabel>
                <Select
                    value={sortType}
                    label="Sort by"
                    onChange={handleChange}
                >
                    {sortItems.map((item) =>
                        <MenuItem key={item.value} value={item.value}>{item.text}</MenuItem>
                    )}
                </Select>
            </FormControl>
        </Box>
    )
}

export default SortProducts