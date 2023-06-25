import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Tooltip } from '@mui/material';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import { addNewFolder } from '../utils/FolderUtils';
import { useSearchParams, useNavigate } from 'react-router-dom'
const NewFolder = () => {
    const navigate = useNavigate()
    const [newFolderName, setNewFolderName] = useState('');
    const [open, setOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams()

    const popupName = searchParams.get('popup')


    const handleOpenPopup = () => {
        setSearchParams({ popup: 'add-folder' })
    };

    const handleClose = () => {
        setNewFolderName('');
        navigate(-1)

    };

    const handleNewFolderNameChange = (e) => {
        setNewFolderName(e.target.value);
    };

    const handleAddNewFolder = async () => {
        const { addFolder } = await addNewFolder({ name: newFolderName });
        console.log(addFolder);
        handleClose();
    };

    useEffect(() => {
        if (popupName === 'add-folder') {
            setOpen(true);
            return
        }
        setOpen(false)
    }, [popupName])
    return (
        <Box>
            <Tooltip title="Add Folder" onClick={handleOpenPopup}>
                <IconButton size="small">
                    <CreateNewFolderOutlinedIcon sx={{ color: 'white' }} />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Folder</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        id='name'
                        label="Folder Name"
                        fullWidth
                        size='small'
                        variant="outlined" // Chỉnh sửa giá trị variant thành "standard"
                        sx={{ width: '400px' }}
                        autoComplete='off'
                        value={newFolderName}
                        onChange={handleNewFolderNameChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddNewFolder}>Ok</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default NewFolder;