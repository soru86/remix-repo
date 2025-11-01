function FormField({
  actionData,
  fieldLabel,
  fieldName,
  multiSpan = false,
}: {
  actionData: any;
  fieldLabel: string;
  fieldName: string;
  multiSpan: boolean;
}) {
  const styleClasses = multiSpan
    ? "h-8 rounded p-1 col-span-3"
    : "h-8 rounded p-1";

  return (
    <>
      <label htmlFor={fieldName} className="font-bold">
        {fieldLabel}
      </label>
      <input
        type="text"
        name={fieldName}
        id={fieldName}
        className={styleClasses}
        defaultValue={actionData?.fields[fieldName]}
      />
    </>
  );
}

export default FormField;
