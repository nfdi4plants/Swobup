// Copyright 2019 University of Freiburg, Chair of Algorithms and Data
// Structures
// Authors: Patrick Brosi <brosi@cs.uni-freiburg.de>

#define PY_SSIZE_T_CLEAN
#include <Python.h>

#define MIN3(a, b, c) \
  ((a) < (b) ? ((a) < (c) ? (a) : (c)) : ((b) < (c) ? (b) : (c)))
#define MIN(a, b) ((a) < (b) ? (a) : (b))

static int ped(const Py_UNICODE* s1, const Py_UNICODE* s2, int s1len, int s2len,
               int delta) {
  unsigned int n = s1len + 1;
  unsigned int m = MIN(n + delta, s2len + 1);

  unsigned int r, c;
  unsigned int matrix[n][m];

  matrix[0][0] = 0;
  for (r = 1; r < n; r++) matrix[r][0] = matrix[r - 1][0] + 1;
  for (c = 1; c < m; c++) matrix[0][c] = matrix[0][c - 1] + 1;
  for (r = 1; r < n; r++) {
    for (c = 1; c < m; c++) {
      matrix[r][c] =
          MIN3(matrix[r - 1][c] + 1, matrix[r][c - 1] + 1,
               matrix[r - 1][c - 1] + (s1[r - 1] == s2[c - 1] ? 0 : 1));
    }
  }

  unsigned int min = delta + 1;
  for (unsigned int c = 0; c < m; c++) {
    if (matrix[n - 1][c] < min) min = matrix[n - 1][c];
  }

  return min;
}

static PyObject* ped_c_ped(PyObject* self, PyObject* args) {
  Py_UNICODE* str_a;
  Py_UNICODE* str_b;
  Py_ssize_t len_a, len_b;
  int delta;

  if (!PyArg_ParseTuple(args, "u#u#i", &str_a, &len_a, &str_b, &len_b, &delta))
    return 0;

  return PyLong_FromLong(ped(str_a, str_b, len_a, len_b, delta));
}

static PyMethodDef PED_C_Methods[] = {
    {"ped", ped_c_ped, METH_VARARGS, "Compute the prefix edit distance."},
    {NULL, NULL, 0, NULL}};

static struct PyModuleDef ped_c_module = {PyModuleDef_HEAD_INIT, "ped", 0, -1,
                                        PED_C_Methods};

PyMODINIT_FUNC PyInit_ped_c(void) { return PyModule_Create(&ped_c_module); }
