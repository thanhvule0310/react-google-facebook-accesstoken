import { Flex } from '@chakra-ui/react';
import Google from './components/Google/Google';
import Facebook from './components/Facebook/Facebook';

function App() {
  return (
    <Flex
      flexDirection={['column', 'column', 'column', 'column', 'row']}
      height={['200vh', '200vh', '200vh', '200vh', '100vh']}
      backgroundColor={'gray.50'}
    >
      <Google />
      <Facebook />
    </Flex>
  );
}

export default App;
