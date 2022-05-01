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
import { useGoogleLogin, GoogleLoginResponse } from 'react-google-login';
import { FaClipboard, FaClipboardCheck, FaGoogle } from 'react-icons/fa';

const Google = () => {
  const toast = useToast();
  const [accessToken, setAccessToken] = useState('');

  const { hasCopied, onCopy } = useClipboard(accessToken);

  const onSignInSuccess = (response: GoogleLoginResponse): void => {
    setAccessToken(response.accessToken);
    toast({ title: 'Google signin success', status: 'success', position: 'top' });
  };

  const onSignInFailed = (): void => {
    setAccessToken('');
    toast({ title: 'Google signin success', status: 'success', position: 'top' });
  };
  const { signIn } = useGoogleLogin({
    clientId: import.meta.env.VITE_GOOGLE_CLIENTID,
    onSuccess: onSignInSuccess as any,
    onFailure: onSignInFailed,
  });

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
      <Heading>Google</Heading>
      <Flex width='100%' flexDirection='column' alignItems='center'>
        <Textarea
          value={accessToken ? accessToken : 'Signin to get token'}
          isReadOnly
          fontSize='sm'
          marginBottom='5'
          variant='filled'
          resize='none'
          fontFamily='mono'
          width='90%'
        ></Textarea>
        <Tooltip label='Copy Google Access Token' hasArrow background='gray.100' color='gray.900'>
          <Button colorScheme='green' disabled={!accessToken} onClick={onCopy}>
            <Icon as={hasCopied ? FaClipboardCheck : FaClipboard} />
          </Button>
        </Tooltip>
      </Flex>

      <Button colorScheme='red' onClick={signIn} paddingX='10' paddingY='7'>
        <Icon as={FaGoogle} marginRight='10px' />
        <Text>Signin with Google</Text>
      </Button>
    </Flex>
  );
};

export default Google;
