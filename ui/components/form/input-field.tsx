import classNames from "classnames";
import { Field, FieldHookConfig, useField } from "formik";

export default function InputField({
  label,
  ...props
}: FieldHookConfig<any> & { label: string }) {
  const [field, meta] = useField(props);
  return (
    <div className="relative z-0 mb-6 w-full group">
      <Field
        type="text"
        placeholder=" "
        {...field}
        {...props}
        className={classNames(
          "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-800 peer",
          { "border-error": meta.touched && meta.error }
        )}
      />
      <label
        htmlFor={props.id || props.name}
        className={classNames(
          "absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",
          { "text-error": meta.touched && meta.error }
        )}
      >
        {label}
      </label>
      {meta.touched && meta.error ? (
        <span className="text-sm text-error">{meta.error}</span>
      ) : null}
    </div>
  );
}
