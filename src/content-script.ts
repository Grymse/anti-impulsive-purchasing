function modifyText(find: string, replace: string): void {
    const body = document.body;
    if (!body) return;
  
    body.innerHTML = body.innerHTML.replace(new RegExp(find, 'g'), replace);
  }
  
  // Expose the function for injection
  export default modifyText;
  