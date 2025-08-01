export function useSelectFile() {
  return async (option?: { accept?: string; multiple?: boolean }) => {
    const input = document.createElement('input') as HTMLInputElement
    input.type = 'file'
    input.accept = option?.accept ?? '.*'
    input.multiple = option?.multiple ?? false
    const promise = new Promise<File[]>((resolve, reject) => {
      input.oncancel = () => {
        resolve(new Array<File>())
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      input.onchange = (e: any) => {
        try {
          const arr = new Array<File>()
          for (const each of e.target.files) {
            arr.push(each)
          }
          resolve(arr)
        } catch (e) {
          reject(e)
        }

        setTimeout(() => {
          try {
            document.body.removeChild(input)
          } catch {
            // no error
          }
        }, 1000 * 10)
      }
    })
    setTimeout(() => {
      input.click()
    }, 0)
    return promise
  }
}
