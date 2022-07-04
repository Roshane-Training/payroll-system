console.info('Admin Employee/Payroll')

const deleteBtns = [...document.querySelectorAll('.delete-btn')]
const cancelBtns = [...document.querySelectorAll('.cancel-btn')]
const deleteModals = [...document.querySelectorAll('.delete-modal')]

deleteBtns.forEach((deleteBtn) => {
    deleteBtn.onclick = (e) => {
        deleteBtn.nextElementSibling.classList.remove('hidden')
    }
})

cancelBtns.forEach((cancelBtn) => {
    cancelBtn.onclick = (e) => {
        deleteBtns.forEach((deleteBtn) => {
            deleteBtn.nextElementSibling.classList.add('hidden')
        })
    }
})

deleteModals.forEach((deleteModal) => {
    deleteModal.onclick = (e) => {
        if (e.target == deleteModal.lastElementChild.firstElementChild) deleteModal.classList.add('hidden')
    }
})
