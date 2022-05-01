import {
  Button,
  Flex,
  Heading,
  Icon,
  Tooltip,
  Text,
  useToast,
  useClipboard,
  Textarea,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaClipboard, FaClipboardCheck, FaFacebook } from 'react-icons/fa';
import FacebookLogin, { LoginResponse } from '@greatsumini/react-facebook-login';

const Facebook = () => {
  const toast = useToast();
  const [accessToken, setAccessToken] = useState('');
  const { hasCopied, onCopy } = useClipboard(accessToken);

  const onSuccess = (res: LoginResponse['authResponse']): void => {
    setAccessToken(res?.accessToken ? res.accessToken : '');
    toast({
      title: 'Facebook signin success',
      status: 'success',
      position: 'top',
    });
  };

  const onFailed = (): void => {
    setAccessToken('');
    toast({
      title: 'Facebook signin failed',
      status: 'error',
      position: 'top',
    });
  };

  return (
    <Flex
      w={['100%', '100%', '100%', '100%', '50%']}
      height={['100vh', '100vh', '100vh', '100vh', 'auto']}
      justifyContent='space-around'
      alignItems='center'
      flexDirection='column'
      padding='10px'
      border='1px'
      borderColor='gray.200'
      margin={['0', '0', '0', '0', '10']}
      borderRadius='base'
    >
      <Heading>Facebook</Heading>
      <Flex width='100%' flexDirection='column' alignItems='center'>
        <Textarea
          value={accessToken ? accessToken : 'Signin to get token'}
          isReadOnly
          fontSize='sm'
          marginBottom='5'
          variant='filled'
          resize='none'
          fontFamily='monospace'
          width='90%'
        ></Textarea>
        <Tooltip label='Copy Facebook Access Token' hasArrow background='gray.100' color='gray.900'>
          <Button colorScheme='green' disabled={!accessToken} onClick={onCopy}>
            <Icon as={hasCopied ? FaClipboardCheck : FaClipboard} />
          </Button>
        </Tooltip>
      </Flex>

      <FacebookLogin
        appId={import.meta.env.VITE_FACEBOOK_CLIENTID}
        onSuccess={onSuccess}
        onFail={onFailed}
        render={({ onClick }) => (
          <Button colorScheme='blue' paddingX='10' onClick={onClick} paddingY='7'>
            <Icon as={FaFacebook} marginRight='10px' />
            <Text>Login with Facebook</Text>
          </Button>
        )}
      />
    </Flex>
  );
};

export default Facebook;
