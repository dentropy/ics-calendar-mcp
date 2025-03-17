import pytest
from factorial import factorial

def test_factorial_zero():
    """Test factorial of 0 is 1"""
    assert factorial(0) == 1

def test_factorial_one():
    """Test factorial of 1 is 1"""
    assert factorial(1) == 1

def test_factorial_positive_integers():
    """Test factorial of positive integers"""
    assert factorial(2) == 2
    assert factorial(3) == 6
    assert factorial(4) == 24
    assert factorial(5) == 120
    assert factorial(10) == 3628800

def test_factorial_large_number():
    """Test factorial of a larger number"""
    assert factorial(20) == 2432902008176640000

def test_factorial_negative_input():
    """Test factorial raises ValueError for negative input"""
    with pytest.raises(ValueError) as excinfo:
        factorial(-1)
    assert "Input must be a non-negative integer" in str(excinfo.value)

def test_factorial_non_integer_input():
    """Test factorial raises TypeError for non-integer input"""
    with pytest.raises(TypeError) as excinfo:
        factorial(3.5)
    assert "Input must be an integer" in str(excinfo.value)
    
    with pytest.raises(TypeError):
        factorial("5")
