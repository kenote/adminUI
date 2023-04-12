
export declare namespace Account {

  interface login {
    username    ?: string
    password    ?: string
  }

  interface uuidResult<T> {
    uuid        ?: string
    result       : T
  }
}