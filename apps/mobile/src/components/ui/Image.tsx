import { Image as ExpoImage, ImageProps } from 'expo-image'
import { cssInterop } from 'nativewind'

// expo-image's Image isn't a core RN component, so NativeWind doesn't know
// to turn `className` into a style prop for it the way it does for View/Text
// automatically - cssInterop registers that mapping explicitly, once, here.
const StyledImage = cssInterop(ExpoImage, { className: 'style' })

export function Image(props: ImageProps) {
  return <StyledImage {...props} />
}
