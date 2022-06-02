import {useEffect, useState} from 'react'
import * as Yup from 'yup'
import {Form, Formik} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import * as userRedux from './index'
import * as users from '../users/index'
import * as roles from '../roles/index'
import {toast} from 'react-toastify'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'
import {isEmpty} from 'lodash'
import Modal from 'rsuite/Modal'
import FormRadio from 'src/cms/helpers/components/forms/FormRadio'
import {StateParamsModel} from 'src/app/modules/common/Model'

type Props = {
  open: boolean
  params?: StateParamsModel
  handleClose: () => void
  actionType: string
  editSelectedData?: any
}

const FORM_VALIDATION = Yup.object().shape({
  userId: Yup.string().required('User is required'),
})

const AddUserRole = ({open, params, handleClose, actionType, editSelectedData}: Props) => {
  const dispatch = useDispatch()
  const [selectedRoles, setSelectedRoles] = useState<Array<string>>([])

  const {loading, success} = useSelector((state: any) => state.userRoles)

  const userData = useSelector((state: any) => state.userManagement)

  const userRole = useSelector((state: any) => state.role)

  useEffect(() => {
    dispatch(users?.actions.getUsers({}))
    dispatch(roles?.actions.getRole())
  }, [])

  useEffect(() => {
    if (success) {
      dispatch(userRedux?.actions.getUserRole(params))
      isEmpty(editSelectedData)
        ? toast.success('User Role added successfully')
        : toast.success('User Role edited successfully')
      dispatch(userRedux?.actions.updateUserRoleReset())
      handleClose()
    }
  }, [success])

  const userOptions = userData?.data?.user?.map((user: any) => ({
    label: user?.name,
    value: user?.id,
  }))

  const roleOptions = userRole?.data?.role?.map((role: any) => ({
    label: role?.name,
    value: role?.id,
  }))

  return (
    <div className='modal-container'>
      <Modal
        open={open}
        onClose={handleClose}
        backdrop='static'
        keyboard={false}
        enforceFocus={false}
      >
        <Modal.Header>
          <Modal.Title>{actionType} Role</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{overflow: 'visible'}}>
          <div>
            <Formik
              initialValues={{
                userId: '',
                roles: '',
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values: any, {setSubmitting}) => {
                const formData: any = {
                  ...values,
                  roles: [{id: values?.roles}],
                }
                if (!isEmpty(editSelectedData)) {
                  delete formData['userId']
                  dispatch(userRedux.actions.updateUserRole(formData, editSelectedData?.id))
                } else {
                  dispatch(userRedux?.actions.CreateUserRole(formData))
                }
              }}
            >
              {({isSubmitting, touched, handleChange, errors, values, setFieldValue}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = ['userId', 'roles']
                    fields.forEach((field) => setFieldValue(field, editSelectedData[field], false))
                    setFieldValue('userId', editSelectedData['id'], false)
                    setFieldValue('roles', editSelectedData['roles'], false)
                    setSelectedRoles(editSelectedData?.roles?.map((role: any) => role.id))
                  }
                }, [])

                return (
                  <Form>
                    <div className='card-body border-top pt-5'>
                      <FormSelect
                        containerClassName='col-lg-8 '
                        placeholder='Select a user'
                        label='Users'
                        name='userId'
                        onChange={handleChange}
                        errors={errors}
                        touched={touched}
                        required={true}
                        options={userOptions}
                        values={values}
                        setFieldValue={setFieldValue}
                      />

                      <label className='form-label fw-bolder text-dark fs-6 '>Select Roles</label>
                      {roleOptions?.map((role: {label: string; value: string}) => (
                        <div className='mb-5'>
                          <FormRadio
                            containerClassName='col-lg-12 fv-row'
                            label='Select Roles'
                            name='roles'
                            type='radio'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            required={true}
                            checkBoxText={role?.label}
                            value={role?.value}
                          />
                        </div>
                      ))}
                    </div>

                    <div className='d-flex justify-content-end px-9 '>
                      <button
                        type='submit'
                        disabled={loading}
                        className='btn btn-primary btn-sm ms-3'
                      >
                        Save
                      </button>
                      <button
                        type='button'
                        onClick={handleClose}
                        className='btn btn-secondary btn-sm ms-3'
                      >
                        Cancel
                      </button>
                    </div>
                  </Form>
                )
              }}
            </Formik>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default AddUserRole
