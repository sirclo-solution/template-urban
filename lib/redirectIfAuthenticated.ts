const redirectIfAuthenticated = (
  res: any,
  cookies: any,
  brand: any,
  page: string
) => {
  const auth = cookies.AUTH_KEY
  const location = brand?.lng ? `/${brand?.lng}/${page}` : `/id/${page}`

  if (auth) {
    res.writeHead(301, {
      Location: location
    })
    res.end()
  }

}

export default redirectIfAuthenticated