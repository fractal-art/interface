import { Button } from '@chakra-ui/react'

const Cpage = () => {
  const handleClear = () => {
    localStorage.clear()
  }
  return (
    <div>
      <Button onClick={handleClear}>Clear LocalStorage</Button>
    </div>
  )
}

export default Cpage
