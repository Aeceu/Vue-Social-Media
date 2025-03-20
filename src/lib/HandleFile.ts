export const handleFile = (e: Event): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    if (e.target instanceof HTMLInputElement) {
      const selectedFile = e.target.files?.[0]
      if (!selectedFile) {
        resolve(null)
        return
      }

      const reader = new FileReader()
      reader.readAsDataURL(selectedFile)
      reader.onloadend = () => {
        const result = reader.result as string
        resolve(result)
      }
      reader.onerror = () => {
        reject(reader.error)
      }
    }
  })
}
