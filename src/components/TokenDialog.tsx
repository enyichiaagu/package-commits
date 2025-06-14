import { forwardRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import useLocalToken from '../hooks/useLocalToken';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  className: string;
  children: React.ReactNode;
}

const Button = forwardRef(function Button(
  { className, children, ...otherProps }: ButtonProps,
  ref: React.Ref<HTMLButtonElement>
) {
  return (
    <button
      {...otherProps}
      ref={ref}
      className={`${className} px-5 py-2 rounded cursor-pointer inline-block`}
    >
      {children}
    </button>
  );
});

interface TokenDialogProps {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: React.RefObject<{ mutate: () => void }>;
}

function TokenDialog({ dialogOpen, setDialogOpen, refresh }: TokenDialogProps) {
  const token = useLocalToken();
  const [localToken, setLocalToken] = useState(token.get());

  return (
    <Dialog.Root open={dialogOpen} modal onOpenChange={setDialogOpen}>
      <Dialog.Overlay className='fixed bg-black/50 inset-0 z-10' />

      <Dialog.Content
        onPointerDownOutside={(e) => e.preventDefault()}
        className='fixed w-[90vw] max-w-2xl top-1/5 left-1/2 -translate-x-1/2 z-15 bg-gray-50 border border-darker-grey rounded-md py-5 px-7 leading-tight tracking-tighter shadow-2xl'
      >
        <Dialog.Title className='font-bold text-base'>
          Rate Limit Error
        </Dialog.Title>
        <Dialog.Description asChild>
          <div className='mt-1 mb-5'>
            <p className='mb-4'>
              {`You have hit the rate limit for GitHub's API. To continue, please
            put your GitHub Personal Access Token in the input box below. The
            token will be saved in localStorage and used to make
            requests.`}
            </p>
            <input
              type='password'
              placeholder='github_pat_xxxxx'
              value={localToken}
              onInput={(e) => setLocalToken(e.currentTarget.value)}
              className='w-full inline-block border-2 border-custom-grey px-5 py-2 rounded-sm'
            />
          </div>
        </Dialog.Description>
        <div className='text-right'>
          <Dialog.Close asChild>
            <Button className='bg-red-100 text-red-700' aria-label='Close'>
              Close
            </Button>
          </Dialog.Close>
          <Button
            className='text-green-100 bg-green-800 ml-5'
            onClick={() => {
              token.set(localToken);
              refresh.current?.mutate();
              setDialogOpen(false);
            }}
          >
            Save
          </Button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default TokenDialog;
