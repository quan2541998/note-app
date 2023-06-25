import { Card, CardContent, List, Typography, Box, Grid, Tooltip, IconButton } from '@mui/material'
import { Link, Outlet, useParams, useLoaderData, useSubmit, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2';
import { NoteAddOutlined } from '@mui/icons-material';

import moment from 'moment'
const NoteList = () => {
    const { noteId, folderId } = useParams()
    const { folder } = useLoaderData()
    const submit = useSubmit()
    const [activeNoteList, setActiveNoteList] = useState(noteId)
    const navigate = useNavigate()
    const handleNewNote = () => {
        submit(
            {
                content: '',
                folderId: folderId
            }, { method: 'post', action: `/folders/${folderId}` })
    }

    useEffect(() => {
        if (noteId) {
            setActiveNoteList(noteId)
            return
        }
        if (folder?.notes?.length > 0) {
            navigate(`note/${folder.notes[0].id}`)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [noteId, folder.notes])


    return (

        <Grid container sx={{ height: '100%' }}>
            <Grid item xs={4} >
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Typography sx={{ mb: '10px' }}>NoteList</Typography>
                    <Scrollbars autoHide style={{ 'flex': 1, background: '#F0EBE3', }}>
                        <List sx={{
                            padding: '15px',
                            textAlign: 'left',
                        }}
                            subheader={
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography>Notes</Typography>
                                    <Tooltip title="Add Note" onClick={handleNewNote}>
                                        <IconButton size="small">
                                            <NoteAddOutlined />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            }>
                            {
                                folder?.notes?.map(({ id, content, updatedAt }) => {
                                    return <Card key={id} sx={{ '&:last-child': { mb: 0 }, mb: '10px', background: id === activeNoteList ? 'rgb(255 211 140)' : 'white' }} onClick={() => { setActiveNoteList(id) }}>
                                        <Link style={{ textDecoration: 'none' }} to={`note/${id}`}>
                                            <CardContent sx={{
                                                '&:last-child': { pb: '10px' }, padding: '10px'
                                            }}>
                                                <div
                                                    dangerouslySetInnerHTML={{ __html: `${content.substring(0, 30) || 'Empty'}` }}
                                                />
                                                <Typography sx={{ fontSize: '10px' }}>{moment(updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
                                            </CardContent>
                                        </Link >
                                    </Card>
                                })
                            }
                        </List >
                    </Scrollbars>
                </Box>
            </Grid>
            <Grid item xs={8} >
                <Outlet />
            </Grid>
        </Grid >


    )
}

export default NoteList