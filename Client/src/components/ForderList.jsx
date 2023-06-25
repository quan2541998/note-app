import { Card, CardContent, List, Typography, Box } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import React, { useState } from 'react'
import NewFolder from './NewFolder';
import { Scrollbars } from 'react-custom-scrollbars-2';
const ForderList = ({ folders }) => {
    const { folderId } = useParams()

    const [activeFolderId, setActiveFolderId] = useState(folderId)

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ mb: '10px' }}>
                Forder-List
            </Typography >
            <Scrollbars autoHide style={{ 'flex': 1, background: '#7D9D9C', }}>
                <List sx={{
                    padding: '15px',
                    textAlign: 'left',
                }}
                    subheader={
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography>
                                Folder
                            </Typography>
                            <NewFolder />
                        </Box>
                    }

                >
                    {folders?.map(({ id, name }) => {
                        return (
                            <Card key={id} sx={{ '&:last-child': { mb: 0 }, mb: '10px', backgroundColor: id === activeFolderId ? 'rgb(255 211 140)' : null }}>
                                <Link key={id} to={`folders/${id}`} style={{ textDecoration: 'none' }} onClick={() => {
                                    setActiveFolderId(id)
                                }}>
                                    <CardContent sx={{
                                        '&:last-child': { pb: '10px' }, padding: '10px'
                                    }}>
                                        <Typography>{name}</Typography>
                                    </CardContent>
                                </Link >
                            </Card>
                        )
                    })}
                </List >
            </Scrollbars>
        </Box >
    )
}

export default ForderList