import { Box, Container, Modal } from '@mui/material'
import React, { ReactElement } from 'react'

const ModalWindow: React.FC<{children: ReactElement, handleClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void, isOpen: boolean}> = ({children, handleClose, isOpen  }) => {
  return (
    <Modal
      component={Container}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: "85%",
          height: "70%",
          overflow: "hidden", 
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
        {children}
        </Box>
      </Modal>
  )
}

export default ModalWindow