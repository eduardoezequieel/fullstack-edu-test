'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

type ImportError = {
  row: number;
  errors: string[];
};

type ImportErrorsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  successCount: number;
  failedCount: number;
  errors: ImportError[];
};

export function ImportErrorsDialog({
  open,
  onOpenChange,
  successCount,
  failedCount,
  errors,
}: ImportErrorsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
            Resultado de la Importación
          </DialogTitle>
          <DialogDescription>
            Se procesaron {successCount + failedCount} registros: {successCount} exitoso(s),{' '}
            {failedCount} fallido(s).
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-muted/50 max-h-96 overflow-y-auto rounded-lg border p-4">
            <div className="space-y-3">
              {errors.map((error, index) => (
                <div
                  key={index}
                  className="rounded-md border border-red-200 bg-red-50 p-3 dark:border-red-900 dark:bg-red-950"
                >
                  <div className="font-semibold text-red-900 dark:text-red-100">
                    Fila {error.row}
                  </div>
                  <ul className="mt-1 list-inside list-disc text-sm text-red-700 dark:text-red-300">
                    {error.errors.map((err, errIndex) => (
                      <li key={errIndex}>{err}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={() => onOpenChange(false)}>Cerrar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
