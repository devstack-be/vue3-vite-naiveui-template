interface Imessage {
  message: string
}

interface IMessages {
  [key: string]: {
    [key: string]: Imessage
  }
}
export const isOptional = (value:any) => !value || value
export const Messages: IMessages = {
  email: {
    required: {
      message: 'Email is required',
    },
    email: {
      message: 'Email is not a valid email address',
    },
  },
  password: {
    sameAs: {
      message: 'Same as'
    },
    required: {
      message: 'Password is required'
    }
  },
  confirm_password: {
    sameAs: {
      message: 'Password must be equal to the confirm password value'
    },
    required: {
      message: 'Confirm password is required'
    }
  },
  username: {
    required: {
      message: 'Username is required'
    }
  }
}
