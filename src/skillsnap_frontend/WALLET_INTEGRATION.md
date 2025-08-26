# Wallet Integration Guide

This guide explains how to use the WalletConnectModal component to integrate multiple wallet connections in your application.

## Supported Wallets

1. **Internet Identity** - Decentralized identity solution for the Internet Computer
2. **Plug Wallet** - Browser extension wallet for the Internet Computer
3. **MetaMask** - Popular Ethereum wallet

## Installation

Make sure you have the required dependencies installed:

```bash
npm install @dfinity/auth-client @dfinity/principal
```

## Usage

Import and use the `WalletConnectModal` component in your application:

```jsx
import { useState } from 'react';
import WalletConnectModal from './components/WalletConnectModal';

function App() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState(null);

  const handleWalletConnected = (address, walletType) => {
    setConnectedWallet({ address, type: walletType });
  };

  return (
    <div>
      <button onClick={() => setIsWalletModalOpen(true)}>
        {connectedWallet ? 'Wallet Connected' : 'Connect Wallet'}
      </button>
      
      {isWalletModalOpen && (
        <WalletConnectModal
          onClose={() => setIsWalletModalOpen(false)}
          onWalletConnected={handleWalletConnected}
          isRegister={false} // Set to true for registration flow
        />
      )}
      
      {connectedWallet && (
        <div>
          <p>Connected with {connectedWallet.type}</p>
          <p>Address: {connectedWallet.address}</p>
        </div>
      )}
    </div>
  );
}

export default App;
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onClose` | Function | Yes | Callback when the modal is closed |
| `onWalletConnected` | Function | Yes | Callback when a wallet is successfully connected |
| `isRegister` | Boolean | No | Set to `true` for registration flow (default: `false`) |

## Wallet Connection Flow

### Internet Identity
1. User clicks the "Internet Identity" button
2. A new window opens with the Internet Identity authentication page
3. After successful authentication, the wallet address is stored in `localStorage`
4. The `onWalletConnected` callback is called with the wallet address and type

### Plug Wallet
1. User clicks the "Plug Wallet" button
2. If Plug Wallet is not installed, the user is redirected to the installation page
3. If installed, the wallet connection is requested
4. After approval, the wallet address is stored in `localStorage`
5. The `onWalletConnected` callback is called with the wallet address and type

### MetaMask
1. User clicks the "MetaMask" button
2. If MetaMask is not installed, the button is disabled with a tooltip
3. If installed, the wallet connection is requested
4. After approval, the wallet address is stored in `localStorage`
5. The `onWalletConnected` callback is called with the wallet address and type

## Styling

The component uses Tailwind CSS for styling. You can customize the appearance by:

1. Overriding the default styles in `WalletConnectModal.css`
2. Using the `className` prop to add custom styles
3. Using the `style` prop for inline styles

## Error Handling

- Failed connections will show an error notification
- The component handles cases where wallets are not installed
- All errors are logged to the console for debugging

## Security Considerations

- Always verify wallet addresses on the server side
- Use proper authentication and authorization for sensitive operations
- Consider rate limiting for wallet connection attempts
- Keep dependencies up to date for security patches
