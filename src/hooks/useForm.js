export default function useForm() {
  // Form submit event => data object
  // e.g. { field1: 'value 1', ... }
  function getData(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    return Object.fromEntries(formData);
  }

  return {
    getData,
  };
}
