import { Highlight, themes } from "prism-react-renderer"

const CodeCard = ({ code, language }) => {

  return (
    <div style={{
        backgroundColor: '#2d2a55',
        overflowX: 'auto',
        borderBottomRightRadius: '0.375rem',
        borderBottomLeftRadius: '0.375rem',
      }}>
      <div   style={{
        borderRadius: '1rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '1rem 1rem 0'
      }}>
        <Highlight
      theme={themes.shadesOfPurple}
      code={code}
      language="tsx"
      >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              <span>{i + 1}</span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
        </Highlight>
      </div>
    </div>
  );
};

export default CodeCard;