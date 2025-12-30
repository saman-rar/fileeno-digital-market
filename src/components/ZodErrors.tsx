import { FieldErrors } from 'react-hook-form'
import { Card, CardContent } from './ui/card'

interface ZodErrorsProps {
  errors: FieldErrors<{ email: string; password: string; confirmPassword?: string }>
}

const ZodErrors = ({ errors }: ZodErrorsProps) => {
  if (errors.email?.message || errors.password?.message || errors.confirmPassword?.message) {
    return (
      <Card>
        <CardContent className="py-5">
          <ul className="space-y-2 list-disc">
            {errors.email?.message && (
              <li className="text-destructive text-sm">{errors.email?.message}</li>
            )}
            {errors.password?.message && (
              <li className="text-destructive text-sm">{errors.password?.message}</li>
            )}
            {errors.confirmPassword?.message && (
              <li className="text-destructive text-sm">{errors.confirmPassword?.message}</li>
            )}
          </ul>
        </CardContent>
      </Card>
    )
  }
}
export default ZodErrors
