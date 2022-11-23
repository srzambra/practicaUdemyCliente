export function ClientLayout(props) {
  const { children } = props;
  return (
    <div>
      <h2>Estamos en client</h2>
      {children}
    </div>
  );
}
